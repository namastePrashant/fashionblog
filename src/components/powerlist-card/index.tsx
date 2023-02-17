import React from "react";
// import { sanitize } from '@utils/sanitize';
import stripHtml from "@utils/strip";

interface PowerListCardInterface {
    data?: any;
}

const PowerListCard: React.FC<PowerListCardInterface> = (props) => {
    const { data } = props;
    const { plFirstName, plLastName, plOrganization, plTitle } =
        data?.nameFields?.plName;
    const avatarUrl = data?.featuredImage?.node?.sourceUrl;

    return (
        <div className="power-list-card card mb-3">
            <div className="row g-0">
                <div className="col-lg-4 col-md-6 col-12">
                    <div className="img-circle-wrapper">
                        <img
                            src={avatarUrl}
                            alt={data?.featuredImage?.node?.altText}
                            className="img-thumbnail"
                        />
                    </div>
                </div>
                <div className="col-md-8 col-md-6  col-12">
                    <div className="card-body">
                        <h5 className="card-title">
                            {plFirstName} {plLastName}
                        </h5>
                        <span className="card-post">{plTitle}</span>
                        <p
                            className="card-text"
                            dangerouslySetInnerHTML={{
                                __html: stripHtml(data?.bio?.plBiographicInfo),
                                // __html: sanitize(data?.bio?.plBiographicInfo)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PowerListCard;
