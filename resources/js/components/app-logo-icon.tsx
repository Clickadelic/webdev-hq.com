import { type ComponentProps } from 'react';
import logoImageSrc from '../../images/icons/icon-48.png';

export default function AppLogoIcon(props: ComponentProps<'img'>) {
    return (
        <img
            src={logoImageSrc}
            alt="WebDev HQ"
            width={48}
            height={48}
            {...props}
        />
    );
}
