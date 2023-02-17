import clsx from "clsx";
import TwoColumnListWidget from "@widgets/two-col-list-widget";
import TextWidget from "@widgets/text-widget";

type TProps = {
    mode?: "light" | "dark";
    menu?: any;
};

const Footer = ({ mode, menu }: TProps) => {
    return (
        <footer className={clsx("main-footer")}>
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <TextWidget mode={mode} className="" />
                    </div>
                    <div className="col-md-5">
                        <TwoColumnListWidget
                            mode={mode}
                            menu={menu}
                            className="col-md-6"
                        />
                    </div>
                </div>
                <p className="trademark">
                    &copy; {new Date().getFullYear()} Total Media Limited.{" "}
                    <span>All Rights Reserved</span>
                </p>
            </div>
        </footer>
    );
};

Footer.defaultProps = {
    mode: "dark",
};

export default Footer;
