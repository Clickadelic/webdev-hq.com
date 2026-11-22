<?php

use Symfony\Component\Yaml\Yaml;

beforeEach(function () {
    $this->dockerComposePath = base_path('docker-compose.yml');
    $this->dockerCompose = Yaml::parseFile($this->dockerComposePath);
});

describe('Docker Compose Configuration', function () {
    it('has all required services defined', function () {
        $services = array_keys($this->dockerCompose['services']);

        expect($services)->toContain('app');
        expect($services)->toContain('node');
        expect($services)->toContain('mysql');
        expect($services)->toContain('phpmyadmin');
    });

    it('exposes correct ports for development', function () {
        $appPorts = $this->dockerCompose['services']['app']['ports'];
        $nodePorts = $this->dockerCompose['services']['node']['ports'];
        $mysqlPorts = $this->dockerCompose['services']['mysql']['ports'];

        expect($appPorts)->toContain('8000:80');
        expect($nodePorts)->toContain('5173:5173');
        expect($mysqlPorts)->toContain('3306:3306');
    });

    it('persists public uploads in a named volume', function () {
        expect($this->dockerCompose['services']['app']['volumes'])
            ->toContain('public-uploads:/var/www/html/storage/app/public')
            ->and($this->dockerCompose['volumes'])->toHaveKey('public-uploads');
    });

    describe('HMR Configuration', function () {
        it('mounts resources directory as bind mount in node container for HMR', function () {
            $nodeVolumes = $this->dockerCompose['services']['node']['volumes'];

            expect($nodeVolumes)->toContain('./resources:/app/resources');
        });

        it('shares public directory between app and node containers', function () {
            $appVolumes = $this->dockerCompose['services']['app']['volumes'];
            $nodeVolumes = $this->dockerCompose['services']['node']['volumes'];

            expect($appVolumes)->toContain('./public:/var/www/html/public');
            expect($nodeVolumes)->toContain('./public:/app/public');
        });

        it('runs vite dev server with host flag for container access', function () {
            $nodeCommand = $this->dockerCompose['services']['node']['command'];

            expect($nodeCommand)->toContain('--host');
        });
    });

    describe('Service Dependencies', function () {
        it('app service depends on healthy mysql', function () {
            $appDependsOn = $this->dockerCompose['services']['app']['depends_on'];

            expect($appDependsOn)->toHaveKey('mysql');
            expect($appDependsOn['mysql']['condition'])->toBe('service_healthy');
        });

        it('node service depends on healthy mysql', function () {
            $nodeDependsOn = $this->dockerCompose['services']['node']['depends_on'];

            expect($nodeDependsOn)->toHaveKey('mysql');
            expect($nodeDependsOn['mysql']['condition'])->toBe('service_healthy');
        });

        it('mysql has healthcheck configured', function () {
            $mysqlHealthcheck = $this->dockerCompose['services']['mysql']['healthcheck'];

            expect($mysqlHealthcheck)->toHaveKey('test');
            expect($mysqlHealthcheck)->toHaveKey('interval');
            expect($mysqlHealthcheck)->toHaveKey('timeout');
            expect($mysqlHealthcheck)->toHaveKey('retries');
        });
    });

    describe('Compose Watch Configuration', function () {
        it('app service has develop watch configured for backend dependencies', function () {
            $appDevelop = $this->dockerCompose['services']['app']['develop']['watch'] ?? [];
            $syncPaths = collect($appDevelop)->pluck('path')->toArray();

            // The docker-compose watch is minimal - only rebuild on package changes
            expect($syncPaths)->toContain('./composer.json');
            expect($syncPaths)->toContain('./composer.lock');
        });

        it('node service has develop watch configured for frontend dependencies', function () {
            $nodeDevelop = $this->dockerCompose['services']['node']['develop']['watch'] ?? [];
            $rebuildActions = collect($nodeDevelop)
                ->filter(fn ($item) => ($item['action'] ?? '') === 'rebuild')
                ->pluck('path')
                ->toArray();

            expect($rebuildActions)->toContain('./package.json');
            expect($rebuildActions)->toContain('./package-lock.json');
        });
    });
});
