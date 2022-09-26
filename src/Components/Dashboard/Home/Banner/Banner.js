import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Style from "./Style.module.scss";
import BannerImg from "../../../../Assets/Dashboard/tutor-banner.png";

function Banner({BannerImage, BannerTitle}) {
  return (
    <div className={Style["banner"] + " aka-br-2 p-4 bg-white position-relative mb-3"}>
        {BannerTitle}
        <p className="aka-fz-1 text-black-50">Hôm nay: </p>
        <p className="aka-color-5 text-capitalize fw-bold">{moment().format("dddd [, Ngày] Do MMMM [Năm] YYYY")}</p>
        <div className={Style["absolute-img"] + " position-absolute"}>
          {BannerImage}
        </div>
    </div>
  )
}

Banner.propTypes = {
  BannerImage: PropTypes.object,
  BannerTitle: PropTypes.object
}

export default Banner

