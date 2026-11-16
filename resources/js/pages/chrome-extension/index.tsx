import PublicLayout from '@/layouts/public-layout';

export default function ChromeExtension() {
    return (
        <PublicLayout title="Chrome-Extensions" showTitle={true}>
            <div className="grid grid-cols-2 gap-12">
                <div className="flex grid-cols-1 flex-col items-center justify-between">
                    <h3 className="mb-5 text-lg">New Tab Extension</h3>
                    <img src="https://placehold.co/744x450" alt="WebDev HQ New Tab Extension" />
                </div>

                <div className="flex grid-cols-1 flex-col items-center justify-between">
                    <h3 className="mb-5 text-lg">Debugger Extension</h3>
                    <img src="https://placehold.co/744x450" alt="WebDev HQ Debugger Extension" />
                </div>
            </div>
        </PublicLayout>
    );
}
