import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react'
import ModalVideo from 'react-modal-video';
import { Link } from 'react-router-dom';

const VideoContent: React.FC = () => {
    const [isOpen, setOpen] = useState<boolean>(false);
    return (
        <div className="col-xxl-12">
            <div className="card h-100 p-0">
                <div className="card-header border-bottom bg-base py-16 px-24">
                    <h6 className="text-lg fw-semibold mb-0">Video</h6>
                </div>
                <div className="card-body p-24">
                    <div className="position-relative">
                        <img
                            src="assets/images/videos/video-img4.png"
                            className="w-100 h-100 object-fit-cover radius-8"
                            alt=""
                        />
                        <Link onClick={() => setOpen(true)}
                            to="#"
                            className="magnific-video bordered-shadow w-56-px h-56-px bg-white rounded-circle d-flex justify-content-center align-items-center position-absolute start-50 top-50 translate-middle z-1"
                        >
                            <Icon
                                icon="ion:play"
                                className="text-primary-600 text-xxl"
                            />
                        </Link>
                    </div>
                </div>
            </div>
            <ModalVideo
                channel="youtube"
                youtube={{ mute: 0, autoplay: 0 }}
                isOpen={isOpen}
                videoId="Vr9WoWXkKeE"
                onClose={() => setOpen(false)}
            />
        </div>
    )
}

export default VideoContent 