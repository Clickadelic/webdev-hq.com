import { type ComponentProps } from 'react';
import logoImageSrc from '../../images/icons/icon-48.png';

/**
 * A logo icon component for the application.
 *
 * @param {ComponentProps<'img'>} props - The props for the image element
 * @returns {React.ReactNode} - The rendered logo icon
 */
export default function AppLogoIcon(props: ComponentProps<'img'>) {
    return <img src={logoImageSrc} alt="WebDev HQ" width={48} height={48} {...props} />;
}
