import React from "react";
import clsx from "clsx";

interface AdvertisementComponentInterface {
    data?: any;
    className?: string;
}

const AdvertisementComponent: React.FC<AdvertisementComponentInterface> = (
    props
) => {
    const { data, className } = props;
    return (
        <>
            {data?.advertisements?.edges?.map((ad?: any) => {
                const {
                    node: { advertisement },
                } = ad;
                return (
                    <div className="advertisement">
                        <div
                            className={clsx(
                                "advertisement__horizontal",
                                className
                            )}
                        >
                            <a
                                href={advertisement?.adUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    className="advertisement__desktop"
                                    src={
                                        advertisement?.adImageDesktop?.sourceUrl
                                    }
                                    alt="advertisement"
                                    height={
                                        advertisement?.adImageDesktop
                                            ?.mediaDetails?.height
                                    }
                                    width={
                                        advertisement?.adImageDesktop
                                            ?.mediaDetails?.width
                                    }
                                />
                                <img
                                    className="advertisement__mobile"
                                    src={
                                        advertisement?.adImageMobile
                                            ?.sourceUrl ??
                                        advertisement?.adImageDesktop?.sourceUrl
                                    }
                                    alt="advertisement"
                                    height={
                                        advertisement?.adImageMobile
                                            ?.mediaDetails?.height ??
                                        advertisement?.adImageDesktop
                                            ?.mediaDetails?.height
                                    }
                                    width={
                                        advertisement?.adImageMobile
                                            ?.mediaDetails?.width ??
                                        advertisement?.adImageDesktop
                                            ?.mediaDetails?.width
                                    }
                                />
                            </a>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default AdvertisementComponent;
