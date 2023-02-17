import { useState } from "react";
import { motion } from "framer-motion";
import Offcanvas from "@ui/offcanvas";
import OffcanvasHeader from "@ui/offcanvas/header";
import OffcanvasBody from "@ui/offcanvas/body";
import Logo from "@components/logo";
import { TMenu } from "@utils/types";
import NavLink from "./nav-link";
import Submenu from "./submenu";
import Megamenu from "./megamenu";
import ExpandButton from "./expand-button";
import { removeCategoryString } from "@utils/transformMenu";

type TProps = {
    menu: TMenu[];
    onClose: () => void;
    isOpen: boolean;
};

const MobileMenu = ({ menu, onClose, isOpen }: TProps) => {
    const [expanded, setExpanded] = useState<false | number>("");
    return (
        <Offcanvas isOpen={isOpen} onClose={onClose}>
            <OffcanvasHeader onClose={onClose}>
                <Logo variant="dark" />
            </OffcanvasHeader>
            <OffcanvasBody className="tw-no-scroll">
                <ul>
                    {menu.map(
                        ({ key, title, uri, url, children, megamenu }) => {
                            const isExpand = key === expanded;
                            const hasChildren: boolean = children.length > 0;
                            return (
                                <li
                                    key={key}
                                    className="tw-relative group tw-border-b tw-border-b-white/[.15] last:tw-border-b-0"
                                >
                                    {title == "Shop" ? (
                                        <a
                                            href={url}
                                            className="tw-text-[16px] tw-font-medium tw-leading-normal tw-block tw-font-medium tw-py-[19px]  tw-text-white hover:tw-text-white"
                                            target="_blank"
                                        >
                                            {title}
                                        </a>
                                    ) : (
                                        <NavLink
                                            path={removeCategoryString(uri)}
                                        >
                                            {title}
                                        </NavLink>
                                    )}
                                    {hasChildren && (
                                        <ExpandButton
                                            onClick={() =>
                                                setExpanded(
                                                    isExpand ? false : key
                                                )
                                            }
                                        />
                                    )}
                                    {hasChildren && (
                                        <motion.div
                                            className="tw-overflow-hidden"
                                            initial={{ height: 0 }}
                                            animate={{
                                                height: isExpand ? "100%" : "0",
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: [0.645, 0.045, 0.355, 1],
                                            }}
                                            aria-expanded={isExpand}
                                        >
                                            <Submenu
                                                menu={children}
                                                isExpand={isExpand}
                                            />
                                        </motion.div>
                                    )}
                                    {megamenu && (
                                        <motion.div
                                            className="tw-overflow-hidden"
                                            initial={{ height: 0 }}
                                            animate={{
                                                height: isExpand ? "100%" : "0",
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: [0.645, 0.045, 0.355, 1],
                                            }}
                                            aria-expanded={isExpand}
                                        >
                                            <Megamenu
                                                menu={megamenu}
                                                isExpand={isExpand}
                                            />
                                        </motion.div>
                                    )}
                                </li>
                            );
                        }
                    )}
                    <li className="subscribe-link">
                        <a href="mailto:subscribe@itotalmedia.com">Subscribe</a>
                    </li>
                </ul>
            </OffcanvasBody>
        </Offcanvas>
    );
};

export default MobileMenu;
