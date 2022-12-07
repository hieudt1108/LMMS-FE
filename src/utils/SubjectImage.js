import React from 'react';
import English from '../Assets/Subjects/englishLogo.png';
import Physical from '../Assets/Subjects/physicsLogo.png';
import Math from '../Assets/Subjects/mathLogo.png';
import Chemistry from '../Assets/Subjects/chemistryLogo.png';
import Philology from '../Assets/Subjects/philology.png';
import History from '../Assets/Subjects/history.png';
import Biology from '../Assets/Subjects/biology.png';
import Geography from '../Assets/Subjects/geography.png';
import MsOffice from '../Assets/Subjects/msoffice.png';
import {Box, Image} from '@mui/material';
import {fileThumb} from "../components/file-thumbnail";

const SubjectImage = ({ subject, width, height }) => {
  switch (subject) {
    case 'Toán học': {
      return <img src={`http://lmms.site:7070/assets/images/subjects/${subject}.png`} style={{ maxWidth: width, maxHeight: height }} alt="Philology" />;
    }
    case 'Ngữ văn': {
      return <img src={`http://lmms.site:7070/assets/images/subjects/${subject}.png`} style={{ maxWidth: width, maxHeight: height }} alt="Philology" />;
    }
    case 'Sinh học': {
      return <img src={Biology} style={{ maxWidth: width, maxHeight: height }} alt="Biology" />;
    }
    case 'Vật lý': {
      return <img src={Physical} style={{ maxWidth: width, maxHeight: height }} alt="Physical" />;
    }
    case 'Hóa học': {
      return <img src={Chemistry} style={{ maxWidth: width, maxHeight: height }} alt="Chemistry" />;
    }
    case 'Địa lý': {
      return <img src={Geography} style={{ maxWidth: width, maxHeight: height }} alt="Geography" />;
    }
    case 'Lịch sử': {
      return <img src={History} style={{ maxWidth: width, maxHeight: height }} alt="History" />;
    }
    case 'Tiếng Anh': {
      return <img src={English} style={{ maxWidth: width, maxHeight: height }} alt="English" />;
    }
    case 'Tin học': {
      return <img src={MsOffice} style={{ maxWidth: width, maxHeight: height }} alt="MsOffice" />;
    }
    default:
      return '';
  }
};

export default SubjectImage;
