import { useMemo } from "react";
import dayjs from "dayjs";
import Anchor from "@ui/anchor";
import AuthorMeta from "@components/blog-meta/author";
import BlogMetaItem from "@components/blog-meta/meta-item";
import SocialShare from "@components/social-share/layout-03";
import TagMeta from "@components/blog-meta/tags";
import Advertisement from "@components/ad/advertisement";
import parse, {
    HTMLReactParserOptions,
    Element,
    attributesToProps,
} from "html-react-parser";
import SwiperSlider, { SwiperSlide } from "@ui/swiper";
import { EffectFade } from "swiper";

const ArticleDetails = (props?: any) => {
    const {
        title,
        date,
        featuredImage,
        content,
        author,
        categories,
        tags,
        ad,
    } = props;

    const sliderOptions = useMemo(() => {
        return {
            modules: [EffectFade],
            effect: "fade" as const,
            fadeEffect: {
                crossFade: true,
            },
            slidesPerView: 1,
            autoplay: true,
            speed: 2000,
            loop: true,
            navigation: true,
            pagination: false,
        };
    }, []);

    const options: HTMLReactParserOptions = {
        replace: (domNode?: any) => {
            if (domNode.attribs && domNode?.attribs?.class === "ngg-gallery") {
                let stringifiedArr = domNode?.children[0]?.data;
                let parsedArr = stringifiedArr
                    ? JSON?.parse(stringifiedArr)
                    : [];
                return (
                    <>
                        {parsedArr?.length > 0 ? (
                            <SwiperSlider
                                options={sliderOptions}
                                className="ngg-slider"
                            >
                                {parsedArr.map((item?: any, idx?: any) => {
                                    if (item !== "") {
                                        return (
                                            <SwiperSlide
                                                key={item?.id}
                                                className="ngg-slider__slide"
                                            >
                                                <div className="ngg-slider__slide__wrapper">
                                                    <img
                                                        src={item?.image}
                                                        alt={`${item?.caption} Image`}
                                                        className="ngg-slider__slide__wrapper_image"
                                                    />
                                                    <span className="ngg-slider__slide__wrapper__caption">
                                                        {item?.caption}
                                                    </span>
                                                    <span className="ngg-slider__slide__wrapper__stat">
                                                        {idx + 1}/
                                                        {parsedArr?.length}
                                                    </span>
                                                </div>
                                            </SwiperSlide>
                                        );
                                    }
                                })}
                            </SwiperSlider>
                        ) : (
                            <></>
                        )}
                    </>
                );
            }

            if (
                domNode instanceof Element &&
                domNode.attribs &&
                domNode.name === "main"
            ) {
                const props = attributesToProps(domNode.attribs);
                return <div {...props} />;
            }
        },
    };

    return (
        <article className="blog-details">
            <div className="blog-details__header_advertisment">
                <Advertisement
                    data={ad?.adDetailAboveTitle}
                    className="vertical"
                />
            </div>

            <div className="entry-header">
                <div className="blog-details__category">
                    {categories?.nodes?.map((category?: any) => {
                        return (
                            <Anchor path={`/${category?.slug}`}>
                                {category.name}
                            </Anchor>
                        );
                    })}
                </div>
                <h2 className="blog-details__title">{title}</h2>
                <div className="blog-details__author">
                    <AuthorMeta author={author?.node} className="author" />
                    <BlogMetaItem
                        className="date"
                        text={dayjs(date).format("MMM DD, YYYY")}
                    />
                </div>

                {featuredImage?.node?.sourceUrl && (
                    <figure className="blog-details__featured">
                        <img
                            className=""
                            src={featuredImage?.node?.sourceUrl}
                            alt={title}
                            width="770"
                        />
                    </figure>
                )}
            </div>
            <div className="social-share">
                <SocialShare className="tw-mt-5 sm:tw-mt-0" />
            </div>
            <div className="blog-content-ads">
                <div className="col-12 col-md-9 col-lg-8">
                    {/* <MarkdownRenderer
                        className="blog-details__content"
                        content={content}
                    /> */}
                    <div className="blog-details__content">
                        {parse(content, options)}
                    </div>
                    <TagMeta tags={tags?.nodes} />
                </div>
                <div className="col-12 col-md-3 col-lg-4">
                    {/* <BannerWidget /> */}
                    <Advertisement
                        data={ad?.adDetailAsideContent}
                        className="advertisement-double"
                    />
                </div>
            </div>
            <Advertisement
                data={ad?.adDetailBelowContent}
                className="vertical"
            />
        </article>
    );
};

export default ArticleDetails;
