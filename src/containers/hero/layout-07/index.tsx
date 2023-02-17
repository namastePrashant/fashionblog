import { useMemo, useState } from "react";
import SwiperCore, { EffectFade } from "swiper";
import { motion } from "framer-motion";
import SwiperSlider, { SwiperSlide } from "@components/ui/swiper";
import { ItemType } from "@utils/types";
import { fadeInUp } from "@utils/variants";
import Anchor from "@ui/anchor";

type TProps = {
    data: {
        items?: Pick<ItemType, "id" | "images" | "categories" | "texts">[];
    };
};

const HeroArea = ({ data: { items } }: TProps) => {
    const [activeIdx, setActiveId] = useState(0);
    const onSlideChange = (swiper: SwiperCore) => {
        const { activeIndex } = swiper;
        setActiveId(activeIndex);
    };

    const onSlideChangeTransitionStart = () => {
        setActiveId(-1);
    };

    const onSlideChangeTransitionEnd = (swiper: SwiperCore) => {
        const { activeIndex } = swiper;
        setActiveId(activeIndex);
    };

    const options = useMemo(() => {
        return {
            modules: [EffectFade],
            effect: "fade" as const,
            fadeEffect: {
                crossFade: true,
            },

            slidesPerView: 1,
            autoplay: false,
            speed: 1000,
            navigation: true,
            pagination: true,
            onSlideChange,
            onSlideChangeTransitionStart,
            onSlideChangeTransitionEnd,
        };
    }, []);

    if (!items || items.length === 0) return null;

    return (
        <SwiperSlider options={options} navClass="hero">
            {items.map((item?: any, idx?: any) => {
                return (
                    <SwiperSlide key={item?.id}>
                        <div className="container hero">
                            <div className="row">
                                <div className="col-md-5 hero__content">
                                    <div className="hero__content-wrapper">
                                        {/* {item?.categories?.[0]?.content && ( */}
                                        <motion.h3
                                            initial="hidden"
                                            animate={
                                                idx === activeIdx
                                                    ? "visible"
                                                    : "exit"
                                            }
                                            exit="exit"
                                            variants={fadeInUp}
                                            className="hero__category"
                                        >
                                            {item?.category}
                                        </motion.h3>
                                        {/* )} */}
                                        {/* {item?.texts?.map((text) => ( */}
                                        <Anchor
                                            path={`/articles/${item?.slug}`}
                                            className="hero__content-wrapper__title"
                                        >
                                            <motion.p
                                                key={item.id}
                                                initial="hidden"
                                                animate={
                                                    idx === activeIdx
                                                        ? "visible"
                                                        : "exit"
                                                }
                                                exit="exit"
                                                variants={fadeInUp}
                                                className="hero__text"
                                            >
                                                {item?.title}
                                            </motion.p>
                                        </Anchor>
                                        {/* ))} */}
                                    </div>
                                </div>
                                <div className="col-md-7 hero__image">
                                    {/* {item?.images?.[0]?.src && ( */}
                                    <div className="hero__image-wrapper">
                                        <Anchor
                                            path={`/articles/${item?.slug}`}
                                        >
                                            <img
                                                src={
                                                    item?.featuredImage?.node
                                                        ?.sourceUrl
                                                }
                                                alt="Featued Image"
                                                height={433}
                                                width={680}
                                                className="img-responsible"
                                            />
                                        </Anchor>
                                    </div>
                                    {/* )} */}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                );
            })}
        </SwiperSlider>
    );
};

export default HeroArea;
