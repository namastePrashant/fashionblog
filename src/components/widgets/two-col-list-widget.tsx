import clsx from "clsx";
import Anchor from "@ui/anchor";
import { removeCategoryString } from "@utils/transformMenu";

type TProps = {
    className?: string;
    mode?: "light" | "dark";
    menu?: any;
};

const TwoColumnListWidget = ({ className, mode, menu }: TProps) => {
    return (
        <div className="row two-column-list">
            <div className={clsx(className)}>
                <ul>
                    {menu?.category?.map((menuItem?: any) => {
                        return (
                            <>
                                <li>
                                    <Anchor path={`/pages${menuItem?.uri}`} target="_blank">{menuItem?.title}</Anchor>
                                </li>
                            </>
                        );
                    })}
                </ul>
            </div>
            <div className={clsx(className)}>
                <ul>
                    {menu?.about?.map((menuItem?: any) => {
                        return (
                            <li>
                                {menuItem?.title?.toLowerCase() ===
                                "subscribe" ? (
                                    <a
                                        href="mailto:subscribe@itotalmedia.com"
                                        target="_blank"
                                    >
                                        Subscribe
                                    </a>
                                ) : (
                                    <>
                                        <Anchor
                                            path={`/pages${removeCategoryString(
                                                menuItem?.uri
                                            )}`}
                                        >
                                            {menuItem?.title}
                                        </Anchor>
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default TwoColumnListWidget;
