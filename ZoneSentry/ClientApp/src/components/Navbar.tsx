﻿import "./../styles/navbar.scss"
import {useState} from "react";
import {Link} from "react-router-dom";

export interface NavbarProps {

}

function Navbar(props: NavbarProps) {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return <>
        <div id="navbar">
            <div className="navbarBox">
                <Link className="logo" to="/">
                    <svg width="105" height="18" viewBox="0 0 105 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.496 4.036V6.772H5.72C6.952 6.772 8.048 6.868 9.008 7.06C9.984 7.252 10.8 7.564 11.456 7.996C12.128 8.428 12.64 8.988 12.992 9.676C13.344 10.364 13.52 11.204 13.52 12.196C13.52 14.036 12.848 15.412 11.504 16.324C10.176 17.22 8.272 17.668 5.792 17.668C5.12 17.668 4.352 17.628 3.488 17.548C2.64 17.468 1.784 17.324 0.92 17.116V0.868H11.96V4.036H4.496ZM5.984 14.476C6.48 14.476 6.952 14.444 7.4 14.38C7.848 14.316 8.24 14.204 8.576 14.044C8.928 13.868 9.208 13.636 9.416 13.348C9.624 13.06 9.728 12.684 9.728 12.22C9.728 11.74 9.632 11.348 9.44 11.044C9.248 10.74 8.976 10.5 8.624 10.324C8.272 10.148 7.84 10.028 7.328 9.964C6.816 9.9 6.24 9.868 5.6 9.868H4.496V14.428C4.672 14.444 4.88 14.46 5.12 14.476C5.376 14.476 5.664 14.476 5.984 14.476ZM27.2574 4.876V17.5H23.6574C23.6574 16.7 23.6654 15.908 23.6814 15.124C23.6974 14.324 23.7134 13.588 23.7294 12.916C23.7454 12.244 23.7614 11.66 23.7774 11.164C23.8094 10.652 23.8254 10.276 23.8254 10.036C23.3614 10.692 22.8974 11.356 22.4334 12.028C21.9694 12.7 21.5214 13.364 21.0894 14.02C20.6734 14.66 20.2734 15.276 19.8894 15.868C19.5214 16.46 19.1934 17.004 18.9054 17.5H15.7614V4.876H19.3374C19.3374 5.676 19.3294 6.444 19.3134 7.18C19.3134 7.9 19.3054 8.556 19.2894 9.148C19.2734 9.74 19.2574 10.26 19.2414 10.708C19.2254 11.14 19.2174 11.476 19.2174 11.716C20.1774 10.308 21.0574 9.044 21.8574 7.924C22.6734 6.804 23.4654 5.788 24.2334 4.876H27.2574ZM29.4928 5.284C30.0528 5.076 30.7008 4.908 31.4368 4.78C32.1728 4.652 32.9728 4.588 33.8368 4.588C34.4928 4.588 35.1328 4.652 35.7568 4.78C36.3808 4.892 36.9328 5.092 37.4128 5.38C37.9088 5.652 38.3008 6.02 38.5888 6.484C38.8928 6.932 39.0448 7.5 39.0448 8.188C39.0448 8.812 38.9008 9.348 38.6128 9.796C38.3248 10.228 37.9168 10.588 37.3888 10.876C38.0928 11.18 38.6128 11.58 38.9488 12.076C39.2848 12.572 39.4528 13.204 39.4528 13.972C39.4528 14.692 39.3008 15.3 38.9968 15.796C38.6928 16.276 38.2848 16.668 37.7728 16.972C37.2608 17.276 36.6768 17.492 36.0208 17.62C35.3648 17.764 34.6848 17.836 33.9808 17.836C33.5648 17.836 33.1328 17.812 32.6848 17.764C32.2368 17.732 31.7968 17.676 31.3648 17.596C30.9488 17.532 30.5488 17.444 30.1648 17.332C29.7808 17.22 29.4368 17.1 29.1328 16.972L29.7808 14.188C30.1168 14.316 30.6288 14.468 31.3168 14.644C32.0208 14.82 32.8128 14.908 33.6928 14.908C35.1328 14.908 35.8528 14.508 35.8528 13.708C35.8528 13.436 35.7968 13.22 35.6848 13.06C35.5728 12.884 35.4208 12.748 35.2288 12.652C35.0528 12.556 34.8448 12.492 34.6048 12.46C34.3648 12.428 34.1248 12.412 33.8848 12.412H31.0768V9.868H33.9088C34.4848 9.868 34.8848 9.756 35.1088 9.532C35.3488 9.292 35.4688 9.02 35.4688 8.716C35.4688 8.412 35.3328 8.14 35.0608 7.9C34.8048 7.644 34.3248 7.516 33.6208 7.516C32.9168 7.516 32.2528 7.58 31.6288 7.708C31.0048 7.836 30.5008 7.956 30.1168 8.068L29.4928 5.284ZM52.3196 17.5H48.7436V12.508H45.0236V17.5H41.4476V4.876H45.0236V9.58H48.7436V4.876H52.3196V17.5ZM54.5461 11.284C54.5461 10.164 54.7141 9.188 55.0501 8.356C55.4021 7.508 55.8581 6.804 56.4181 6.244C56.9781 5.684 57.6181 5.26 58.3381 4.972C59.0741 4.684 59.8261 4.54 60.5941 4.54C62.3861 4.54 63.8021 5.092 64.8421 6.196C65.8821 7.284 66.4021 8.892 66.4021 11.02C66.4021 11.228 66.3941 11.46 66.3781 11.716C66.3621 11.956 66.3461 12.172 66.3301 12.364H58.2181C58.2981 13.1 58.6421 13.684 59.2501 14.116C59.8581 14.548 60.6741 14.764 61.6981 14.764C62.3541 14.764 62.9941 14.708 63.6181 14.596C64.2581 14.468 64.7781 14.316 65.1781 14.14L65.6581 17.044C65.4661 17.14 65.2101 17.236 64.8901 17.332C64.5701 17.428 64.2101 17.508 63.8101 17.572C63.4261 17.652 63.0101 17.716 62.5621 17.764C62.1141 17.812 61.6661 17.836 61.2181 17.836C60.0821 17.836 59.0901 17.668 58.2421 17.332C57.4101 16.996 56.7141 16.54 56.1541 15.964C55.6101 15.372 55.2021 14.676 54.9301 13.876C54.6741 13.076 54.5461 12.212 54.5461 11.284ZM62.9461 9.916C62.9301 9.612 62.8741 9.316 62.7781 9.028C62.6981 8.74 62.5621 8.484 62.3701 8.26C62.1941 8.036 61.9621 7.852 61.6741 7.708C61.4021 7.564 61.0581 7.492 60.6421 7.492C60.2421 7.492 59.8981 7.564 59.6101 7.708C59.3221 7.836 59.0821 8.012 58.8901 8.236C58.6981 8.46 58.5461 8.724 58.4341 9.028C58.3381 9.316 58.2661 9.612 58.2181 9.916H62.9461ZM76.4578 17.836C73.7538 17.836 71.6898 17.084 70.2658 15.58C68.8578 14.076 68.1538 11.94 68.1538 9.172C68.1538 7.796 68.3698 6.572 68.8018 5.5C69.2338 4.412 69.8258 3.5 70.5778 2.764C71.3298 2.012 72.2258 1.444 73.2658 1.06C74.3058 0.675999 75.4338 0.483999 76.6498 0.483999C77.3538 0.483999 77.9938 0.539999 78.5698 0.651999C79.1458 0.747999 79.6498 0.867999 80.0818 1.012C80.5138 1.14 80.8738 1.276 81.1618 1.42C81.4498 1.564 81.6578 1.676 81.7858 1.756L80.7058 4.78C80.1938 4.508 79.5938 4.276 78.9058 4.084C78.2338 3.892 77.4658 3.796 76.6018 3.796C76.0258 3.796 75.4578 3.892 74.8978 4.084C74.3538 4.276 73.8658 4.588 73.4338 5.02C73.0178 5.436 72.6818 5.98 72.4258 6.652C72.1698 7.324 72.0418 8.14 72.0418 9.1C72.0418 9.868 72.1218 10.588 72.2818 11.26C72.4578 11.916 72.7298 12.484 73.0978 12.964C73.4818 13.444 73.9778 13.828 74.5858 14.116C75.1938 14.388 75.9298 14.524 76.7938 14.524C77.3378 14.524 77.8258 14.492 78.2578 14.428C78.6898 14.364 79.0738 14.292 79.4098 14.212C79.7458 14.116 80.0418 14.012 80.2978 13.9C80.5538 13.788 80.7858 13.684 80.9938 13.588L82.0258 16.588C81.4978 16.908 80.7538 17.196 79.7938 17.452C78.8338 17.708 77.7218 17.836 76.4578 17.836ZM88.7266 15.004C89.0786 15.004 89.4146 14.996 89.7346 14.98C90.0546 14.964 90.3106 14.94 90.5026 14.908V12.196C90.3586 12.164 90.1426 12.132 89.8546 12.1C89.5666 12.068 89.3026 12.052 89.0626 12.052C88.7266 12.052 88.4066 12.076 88.1026 12.124C87.8146 12.156 87.5586 12.228 87.3346 12.34C87.1106 12.452 86.9346 12.604 86.8066 12.796C86.6786 12.988 86.6146 13.228 86.6146 13.516C86.6146 14.076 86.7986 14.468 87.1666 14.692C87.5506 14.9 88.0706 15.004 88.7266 15.004ZM88.4386 4.54C89.4946 4.54 90.3746 4.66 91.0786 4.9C91.7826 5.14 92.3426 5.484 92.7586 5.932C93.1906 6.38 93.4946 6.924 93.6706 7.564C93.8466 8.204 93.9346 8.916 93.9346 9.7V17.14C93.4226 17.252 92.7106 17.38 91.7986 17.524C90.8866 17.684 89.7826 17.764 88.4866 17.764C87.6706 17.764 86.9266 17.692 86.2546 17.548C85.5986 17.404 85.0306 17.172 84.5506 16.852C84.0706 16.516 83.7026 16.084 83.4466 15.556C83.1906 15.028 83.0626 14.38 83.0626 13.612C83.0626 12.876 83.2066 12.252 83.4946 11.74C83.7986 11.228 84.1986 10.82 84.6946 10.516C85.1906 10.212 85.7586 9.996 86.3986 9.868C87.0386 9.724 87.7026 9.652 88.3906 9.652C88.8546 9.652 89.2626 9.676 89.6146 9.724C89.9826 9.756 90.2786 9.804 90.5026 9.868V9.532C90.5026 8.924 90.3186 8.436 89.9506 8.068C89.5826 7.7 88.9426 7.516 88.0306 7.516C87.4226 7.516 86.8226 7.564 86.2306 7.66C85.6386 7.74 85.1266 7.86 84.6946 8.02L84.2386 5.14C84.4466 5.076 84.7026 5.012 85.0066 4.948C85.3266 4.868 85.6706 4.804 86.0386 4.756C86.4066 4.692 86.7906 4.644 87.1906 4.612C87.6066 4.564 88.0226 4.54 88.4386 4.54ZM96.5203 1.732L100.096 1.156V4.876H104.392V7.852H100.096V12.292C100.096 13.044 100.224 13.644 100.48 14.092C100.752 14.54 101.288 14.764 102.088 14.764C102.472 14.764 102.864 14.732 103.264 14.668C103.68 14.588 104.056 14.484 104.392 14.356L104.896 17.14C104.464 17.316 103.984 17.468 103.456 17.596C102.928 17.724 102.28 17.788 101.512 17.788C100.536 17.788 99.7283 17.66 99.0883 17.404C98.4483 17.132 97.9363 16.764 97.5523 16.3C97.1683 15.82 96.8963 15.244 96.7363 14.572C96.5923 13.9 96.5203 13.156 96.5203 12.34V1.732Z" fill="#0022FF"/>
                    </svg>
                </Link>
                <Link className="search" to="/search">Search</Link>
                <div className="userArea">
                    <p className="greenText">Доход</p>
                    <p className="redText">Расход</p>
                    <button onClick={() => setShowProfileMenu(!showProfileMenu)}>
                        <img className="profileIcon" src='/defaultPictures/user.jpg'/>
                        {showProfileMenu && <div className="profileMenu">
                            <Link to="/profile">Профиль</Link>
                            <Link to="/logout">Выйти</Link>
                        </div>}
                    </button>
                </div>
            </div>
        </div>
    </>
}

export default Navbar;