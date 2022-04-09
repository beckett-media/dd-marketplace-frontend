import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Modal } from 'antd';
import ReactModal from 'react-modal';


import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
} from 'react-share';
import { toPng } from 'html-to-image';

import { message, Button } from 'antd';
import Share from '../../../public/static/img/facreport/svgs/Share.svg';
import Download from '../../../public/static/img/facreport/svgs/Download.svg';
import Copy from '../../../public/static/img/facreport/svgs/Copy.svg';
import TwitterBlue from '../../../public/static/img/facreport/svgs/TwitterBlue.svg';
import FacebookBlue from '../../../public/static/img/facreport/svgs/FacebookBlue.svg';
import Email from '../../../public/static/img/facreport/svgs/Email.svg';
import Pdf from '../../../public/static/img/facreport/svgs/Pdf.svg';
import Camera from '../../../public/static/img/facreport/svgs/Camera.svg';
import { CloseOutlined } from '@ant-design/icons';

import { CONFIG } from '../../../constants/Config';
import Payment from '../Payment';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    overlay: { zIndex: 999999 },
};
const shareStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden !important',
        height: 'fit-content',
    },
    overlay: { zIndex: 999999 },
};

const ShareContainer = ({ getImage, getPDF, onCloseCall }) => {
    const [modal, setModal] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    const router = useRouter();

    const copyToClipboard = () => {
        const el = document.createElement('textarea');
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="d-flex">
            <ReactModal
                isOpen={Boolean(modal)}
                onRequestClose={() => {
                    setModal(false);
                }}
                style={customStyles}>
                <p>Choose download option</p>
                <button
                    type="button"
                    onClick={() => {
                        setModal(false);
                        getPDF();
                    }}
                    className="btn btn-primary mx-2">
                    <img src={Pdf} width="30px" height="30px" fill="#FFF" /> PDF
                </button>
                <button
                    type="button"
                    className="btn btn-info text-white mx-2"
                    onClick={() => {
                        setModal(false);
                        getImage();
                    }}>
                    <img src={Camera} width="30px" height="30px" fill="#FFF" />{' '}
                    Image
                </button>
            </ReactModal>
            <div
                className="mx-2 d-flex align-items-center justify-content-center"
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: '#0092C7',
                }}>
                <img
                    src={Download}
                    width="30px"
                    height="30px"
                    style={{ cursor: 'pointer', color: 'white' }}
                    onClick={() => {
                        getImage();
                        onCloseCall && onCloseCall();
                    }}
                    fill="#fff"
                />
            </div>
            <div className="mx-2" style={{ position: 'relative' }}>
                <div
                    className={`alert alert-primary p-2 text-center alert-dismissible fade ${
                        copied ? 'show' : ''
                    }`}
                    style={{
                        position: 'absolute',
                        width: 150,
                        left: '50%',
                        bottom: -80,
                        transform: 'translateX(-50%)',
                    }}
                    role="alert">
                    <small className="text-center">
                        URL copied to clipboard!
                    </small>
                </div>
                <img
                    src={Copy}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        copyToClipboard();
                        onCloseCall && onCloseCall();
                    }}
                />
            </div>

            <div className="mx-2">
                <TwitterShareButton
                    url={`${process.env.marketUrl}${router.asPath}`}
                    quote={`Checkout this Card Snapscore ${(
                        <span>&trade;</span>
                    )} Report from Due Dilly`}
                    hashtag="#duedilly">
                    <img src={TwitterBlue} />
                </TwitterShareButton>
            </div>
            <div className="mx-2">
                <FacebookShareButton
                    url={`${process.env.marketUrl}${router.asPath}`}
                    quote={`Checkout this Card Snapscore ${(
                        <span>&trade;</span>
                    )} Report from Due Dilly`}
                    hashtag="#duedilly">
                    <img src={FacebookBlue} />
                </FacebookShareButton>
            </div>
            <div className="mx-2">
                <EmailShareButton
                    onClick={() => {}}
                    url={`${process.env.marketUrl}${router.asPath}`}
                    subject={`Card Snapscore ${(
                        <span>&trade;</span>
                    )} Report | Due Dilly`}
                    body={`Checkout this Card Snapscore ${(
                        <span>&trade;</span>
                    )} Report from Due Dilly ${process.env.marketUrl}${
                        router.asPath
                    }`}>
                    <img src={Email} />
                </EmailShareButton>
            </div>
        </div>
    );
};

const MarketValueBox = ({ gradeData = [], loading }) => {
    return (
        <div className="max-val-box">
            <p className="text-white text-center text-lg-start small">
                Market Value as of the date of the CardFacs was generated with a
                statement that this estimate will be valued for 3 days of date
                it was generated.
            </p>
            <p className="text-white mt-3 text-center font-weight-bold py-3">
                Coming soon...
            </p>
        </div>
    );
};

const ImageGallery = ({ gallery, initialImg, setOrientation }) => {
    const [selectedImage, setSelectedImage] = React.useState(initialImg);
    const setLayoutOrientation = (source) => {
        let image = new Image();
        image.src = source;
        if (image.width > image.height) {
            setOrientation('landscape');
        } else {
            setOrientation('portrait');
        }
    };

    React.useEffect(() => {
        if (selectedImage.url) {
            setLayoutOrientation(selectedImage.url);
        }
    }, [selectedImage]);

    return (
        <div className="">
            <img src={selectedImage.url} className="gallery-big-image" />
            <div className="d-flex my-4 flex-wrap">
                {gallery.map((item) => (
                    <div
                        onClick={() => setSelectedImage(item)}
                        key={item.key}
                        className="mr-4">
                        <img src={item.url} className="gallery-thumbnail" />
                        {selectedImage?.key === item.key ? (
                            <div className="selected-image-mark"></div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
};

const FacBanner = ({
    card,
    gradeData,
    loading,
    currentPageRef,
    cardId,
    price,
    quantity,
}) => {
    const [shareModal, setShareModal] = React.useState(false);
    const [gallery, setGallery] = React.useState([]);
    const [orientation, setOrientation] = React.useState('portrait');

    const handleHideModal = () => {
        setShareModal(false);
    };
    React.useEffect(() => {
        if (card)
            setGallery([
                {
                    url:
                        (card.front.startsWith('cardFront')
                            ? CONFIG.s3BaseUrl
                            : CONFIG.base_url) +
                        '/' +
                        card.front,
                    key: 'front',
                },
                {
                    url:
                        (card.front.startsWith('cardFront')
                            ? CONFIG.s3BaseUrl
                            : CONFIG.base_url) +
                        '/' +
                        card.back,
                    key: 'back',
                },
            ]);
    }, [card]);

    const getImage = useCallback(() => {
        message
            .loading('Compiling everything for you...', 2)
            .then(() => message.success('Compiled Successfully', 3))
            .then(() => message.loading('File is Downloading', 118));
        if (currentPageRef.current === null) {
            return;
        }

        toPng(currentPageRef.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = `${cardId}-report.png`; // set the name of the download file
                link.href = dataUrl;
                link.click();
                message.destroy();
                message.success('Download completed', 3);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [currentPageRef]);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    return (
        <>
            <div className="fac-container py-5">
                {/* <div className="due-dilly-clockwise-wrapper">
          <span className="due-dilly-clockwise">DUE DILLY</span>
        </div> */}
                <div className="container-md">
                    <div className="d-flex w-100 justify-content-between">
                        <div className="">
                            <p className="h2 m-0 text-white font-weight-bolder pti-font setfont">
                                DUE DILLY CARD SNAPSCORE&trade;
                            </p>
                            <p className="text-white m-0">
                                SNAPSCORE&trade; ASSESSMENT OF CARD
                            </p>
                        </div>
                        <div className="d-none d-lg-flex">
                            <ShareContainer getImage={getImage} />
                        </div>
                        <div
                            className="d-flex d-lg-none"
                            onClick={() => setShareModal(true)}>
                            <img src={Share} fill="#fff" width="40" />
                        </div>
                        <ReactModal
                            isOpen={Boolean(shareModal)}
                            onRequestClose={() => {
                                setShareModal(false);
                            }}
                            style={shareStyles}>
                            <div className="d-flex">
                                <ShareContainer
                                    // getPDF={getPDF}
                                    getImage={getImage}
                                    onCloseCall={handleHideModal}
                                />
                            </div>
                        </ReactModal>
                    </div>

                    <div className="row g-0 py-5 d-flex">
                        <div
                            className={`col-12 col-lg-${
                                orientation === 'portrait' ? '4' : '7'
                            } fac-banner-img-container position-relative`}>
                            {gallery.length > 0 && (
                                <ImageGallery
                                    gallery={gallery}
                                    setOrientation={setOrientation}
                                    initialImg={gallery[0]}
                                />
                            )}
                        </div>
                        <div
                            className={`col-12 col-lg-${
                                orientation === 'portrait' ? '8' : '5'
                            }`}>
                            <p className="h1 m-0 text-uppercase font-weight-bolder text-white pti-font">
                                {card?.playerNames.join(' ')}
                            </p>
                            <p className="text-white h5 my-3">
                                {card?.type}{' '}
                                {card?.brand[0].toUpperCase() +
                                    card?.brand.slice(1)}{' '}
                                {card?.modelNo} {card?.serialNo}
                            </p>
                            <p className="text-white h5">{card?.year}</p>
                            <Modal
                                visible={isModalVisible}
                                width={500}
                                shouldCloseOnOverlayClick={true}
                                onCancel={() => {
                                    handleCancel();
                                }}
                                maskClosable={false}
                                footer={null}
                                style={{ top: 20 }}
                                closeIcon={
                                    <CloseOutlined
                                        style={{
                                            color: '#fff',
                                            margin: '32px 22px 0 0',
                                            fontSize: '25px',
                                        }}
                                    />
                                }>
                                <Payment
                                    cardId={cardId}
                                    price={price}
                                    handleClose={handleCancel}
                                />
                            </Modal>
                            {price && (
                                <Button
                                    type="primary"
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    className="gradient-link bold text-center buttonstyle"
                                    onClick={quantity ? showModal : null}>
                                    <span
                                        style={{
                                            fontSize: 'large',
                                            fontWeight: 'bold',
                                        }}>
                                        {quantity
                                            ? `Buy This Card $${price}`
                                            : 'Sold'}
                                    </span>
                                </Button>
                            )}
                            <p className="text-white h3 fond-weight-bolder font-poppins mt-5">
                                <strong>MARKET</strong> VALUE 🔥
                            </p>
                            <div className="white-underline"></div>
                            <MarketValueBox
                                gradeData={gradeData}
                                loading={loading}
                                cardId={cardId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FacBanner;
