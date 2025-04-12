import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

const SuccessModal = ({ visible, onCancel, message }) => {
  const { t } = useTranslation();

  return (
    <div className={`fixed inset-0 z-50 ${visible ? '' : 'hidden'}`}>
      <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-50" onClick={onCancel}></div>
      <div className="modal-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6">
        <div className="modal-header flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#78B044]">{t('success')}</h2>
          <button className="close-btn border border-borderLine rounded-[50%] p-2 text-gray-500 text-[#6AA17C]" onClick={onCancel}>
            <CloseIcon />
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer flex justify-end pt-4 mt-4 border-t border-gray-200">
          <button className="bg-[#78B044] hover:bg-[#6AA17C] px-5 text-white font-bold py-2 px-4 rounded" onClick={onCancel}>
            {t('ok')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
