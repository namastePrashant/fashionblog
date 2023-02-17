import clsx from "clsx";
import Social, { SocialLink } from "@components/ui/social";
import Logo from "@components/logo";

type TProps = {
    className?: string;
    mode?: "light" | "dark";
};

const TextWidget = ({ className, mode }: TProps) => {
    return (
        <div className={clsx(className)}>
            <Logo variant="light" className="" />
            <div className="col-7">
                <p className="intro-section">
                    An international monthly luxury lifestyle magazine,
                    providing definitive coverage of contemporary style and
                    culture.
                </p>
            </div>
            <div className="social">
                <SocialLink
                    href="https://www.facebook.com/GafencuMagazine"
                    label="Facebook Link"
                >
                    <i className="fab fa-facebook" />
                </SocialLink>
                <SocialLink
                    href="https://www.instagram.com/gafencu_magazine"
                    label="instagram Link"
                >
                    <i className="fab fa-instagram" />
                </SocialLink>
                <SocialLink
                    href="https://twitter.com/iGafencu"
                    label="twitter Link"
                >
                    <i className="fab fa-twitter" />
                </SocialLink>
                <SocialLink
                    href="https://www.youtube.com/c/gafencumen"
                    label="Youtube Link"
                >
                    <i className="fab fa-youtube" />
                </SocialLink>
                <SocialLink
                    href="https://www.linkedin.com/company/igafencu"
                    label="linkedin Link"
                >
                    <i className="fab fa-linkedin" />
                </SocialLink>
            </div>
            <div className="store-image">
                <a href="" target="_blank">
                    <img
                        src="/img/icons/appstore.png"
                        alt="App Store"
                        width={114}
                        height={34}
                    />
                </a>
                <a href="" target="_blank">
                    <img
                        src="/img/icons/playstore.png"
                        alt="App Store"
                        width={114}
                        height={34}
                    />
                </a>
            </div>
        </div>
    );
};

export default TextWidget;
