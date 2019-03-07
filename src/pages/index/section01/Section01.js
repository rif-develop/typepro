import React from 'react';
import styles from './Section01.scss';
import classNames from 'classnames';

const cx = classNames.bind(styles);
//svg animation 라이브러리
import Snap from 'snapsvg-cjs';

class Section01 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            greenPath: {
                one: 'M541.317 169.948c-33.91-41.177-73.476-70.409-132.648-105.33C363.035 37.685 288.5 11.05 233.439 2.792c-55.06-8.258-90.923 2.32-131.886 24.816C60.59 50.104 25.256 95.316 13.738 142.903S-2.127 236.1.968 291.38c3.62 64.656 24.306 143.548 44.33 185.018 20.022 41.47 54.599 71.94 92.447 87.217 46.042 18.583 97.844 17.098 143.101 0 45.258-17.099 76.856-32.659 127.823-66.586 50.966-33.927 87.887-67.74 116.62-96.828 28.735-29.088 45.82-64.792 50.73-107.9 4.909-43.108-8.895-90.105-34.702-122.352z',
                two: 'M540.376 181.915c-22.144-30.913-65.039-77.32-122.321-112.775-57.283-35.454-99.616-51.501-137.539-61.58-37.923-10.08-90.832-10.08-131.017 0-40.185 10.079-89.026 61.58-107.16 107.404C24.208 160.787 4.083 239.77 1.572 298.744c-2.71 63.64-3.805 108.854 13.03 155.804 16.833 46.95 46.785 83.388 94.487 105.897 47.702 22.51 100.545 19.41 141.003 6.442 44.83-14.37 87.108-29.814 140.465-63.367 53.358-33.554 84.792-55.511 121.065-93.377 36.273-37.866 60.767-73.28 64.808-118.71 4.04-45.432-13.91-78.604-36.053-109.518z',
            },
            purplePath: {
                one: 'M530.752 362.109c9.752-68.076-39.012-188.737-98.21-263.415C373.344 24.016 330.504 3.206 270.555.225c-59.95-2.98-107.77 23.79-149.24 71.931-41.47 48.14-61.623 80.755-80.072 120.52C22.793 232.443-3.587 300.937.405 354.26c3.991 53.323 42.612 120.037 125.305 142.859 82.694 22.822 184.502 18.325 264.564 3.6C470.337 485.994 521 430.186 530.752 362.11z',
                two: 'M532.637 308.593c0-78.448-99.36-185.834-150.655-233.457-51.294-47.622-106.429-86.208-170.456-72.24C147.5 16.863 120.53 41.48 96.702 75.136 72.875 108.791 60.6 157.364 36.99 223.606 13.379 289.846-5.114 338.628 2.292 388.387c7.407 49.76 29.504 90.975 114.292 113.586 84.788 22.61 194.367 9.114 283.05-28.318 88.682-37.433 133.003-86.615 133.003-165.063z',
            },
            violetPath: {
                one: 'M528.805 144.532C521.3 97.183 488.097 48.514 436.778 26.95 385.46 5.383 294.643-5.13 230.926 2.45 167.208 10.033 98.08 23.381 55.647 64.234 13.214 105.086-14.909 166.159 8.443 240.668c23.352 74.51 66.843 148.604 139.515 216.06 72.673 67.455 152.487 70.83 217.185 28.381 64.697-42.45 110.55-135.469 136.267-198.44 25.717-62.971 34.06-100.093 27.395-142.137z',
                two: "M529.748 162.118c-7.595-47.526-37.546-78.624-78.51-104.533-40.965-25.909-89.928-43.92-160.186-53.33C220.794-5.156 112.59-.656 67.279 35.11c-45.312 35.766-80.115 100.185-62.713 178.4 17.401 78.217 50.848 166.437 124.375 234.144s156.799 76.734 207.094 54.487c50.296-22.246 126.115-128.88 152.555-187.967 26.44-59.087 47.902-109.857 41.158-152.057z",
            },
            firstFrame: 2900,
            secondFrame: 2750,
            easing: mina.easeinout,
        };//state

        //ref
        this.violet = React.createRef();
        this.purple = React.createRef();
        this.green = React.createRef();
        //binding
        this.pupleBubbleAnime = this.pupleBubbleAnime.bind(this);
        this.violetBubbleAnime = this.violetBubbleAnime.bind(this);
        this.greenBubbleAnime = this.greenBubbleAnime.bind(this);
        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);



    }

    componentDidMount() {
        this.pupleBubbleAnime();
        this.violetBubbleAnime();
        this.greenBubbleAnime();

        // let tl = new TimelineMax({paused: true});
        //
        // tl.staggerFromTo('#violet-one', 0.4, {scale: 1.3, opacity: 0, transformOrigin: 'center center'}, {scale: 1, opacity: .88, ease: Back.easeOut}, 1)
        //     .staggerFromTo('#green-one', 0.5, {scale:1.22, opacity: 0, transformOrigin: 'center center'}, {scale: 1, opacity: 1, ease: Back.easeOut}, 1)
        //     .staggerFromTo('#purple-one', 0.6, {scale: 1.23, opacity: 0, transformOrigin: 'center center'}, {scale: 1, opacity: .9, ease: Back.easeOut}, 1)
        //
        // tl.play();
    }


    onMouseEnterHandler(){

        this.setState({
            firstFrame: 5000,
            secondFrame: 5900,
            easing: mina.easeout
        });
    }

    onMouseLeaveHandler(){
        this.setState({
            firstFrame: 2900,
            secondFrame: 2750,
            easing: mina.easeinout
        });
    }

    pupleBubbleAnime() {
        const violetFrame = Snap.select('#purple-one');
        const violetPath = this.state.purplePath;

        //화살표 함수를 쓰면 this가 전역을 참조, 일반 함수는 이어서 씀
        violetFrame.animate({
            d: violetPath.one
        }, this.state.firstFrame, this.state.easing, () => {
            violetFrame.animate({
                d: violetPath.two
            }, this.state.secondFrame, this.state.easing, this.pupleBubbleAnime);
        })
    }

    violetBubbleAnime() {
        const violetFrame = Snap.select('#violet-one');
        const violetPath = this.state.violetPath;

        //화살표 함수를 쓰면 this가 전역을 참조, 일반 함수는 이어서 씀
        violetFrame.animate({
            d: violetPath.one
        }, this.state.firstFrame, this.state.easing, () => {
            violetFrame.animate({
                d: violetPath.two
            }, this.state.secondFrame, this.state.easing, this.violetBubbleAnime);
        })
    }

    greenBubbleAnime() {
        const violetFrame = Snap.select('#green-one');
        const violetPath = this.state.greenPath;

        //화살표 함수를 쓰면 this가 전역을 참조, 일반 함수는 이어서 씀
        violetFrame.animate({
            d: violetPath.one
        }, this.state.firstFrame, this.state.easing, () => {
            violetFrame.animate({
                d: violetPath.two
            }, this.state.secondFrame, this.state.easing, this.greenBubbleAnime);
        })
    }

    componentWillUnmount() {
        this.pupleBubbleAnime = this.pupleBubbleAnime.bind(null);
        this.pupleBubbleAnime = this.pupleBubbleAnime.bind(null);
        this.pupleBubbleAnime = this.pupleBubbleAnime.bind(null);
    }

    render() {
        //propsToState
        const {language} = this.props;

        return (
            <section className={cx(styles['main-section'], 'section')}>
                <div className={styles['main-section--content']}>
                    <div className={styles['outer']}>
                        <div className={styles['inner']}>
                            <div className={styles['centered']}>
                                <div></div>
                                <div className={styles['main-section--content--text']}>
                                    <div className={styles['main-section--content--text__upper']}>
                                        <h1>육아의 다음 레벨, 리틀원</h1>
                                    </div>
                                    <div className={styles['main-section--content--text__lower']}>
                                        <p>힘든 육아 우리가 도울게요.<br/>소중한 아이를 안전하고 영리하게 돌보세요.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['main-section--svg-container']}>
                    <svg width="532" height="513" viewBox="0 0 532 513" id={styles['violet']} onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
                        <defs>
                            <radialGradient cx="-19.513%" cy="89.587%" fx="-19.513%" fy="89.587%" r="139.856%"
                                            gradientTransform="matrix(.85454 -.4665 .45729 .89748 -.438 0)"
                                            id="violetColor">
                                <stop stopColor="#B620B4" offset="0%"/>
                                <stop stopColor="#3726AF" offset="100%"/>
                            </radialGradient>
                        </defs>
                        <path id="violet-one"
                              ref={this.violet}
                              d="M528.805 144.532C521.3 97.183 488.097 48.514 436.778 26.95 385.46 5.383 294.643-5.13 230.926 2.45 167.208 10.033 98.08 23.381 55.647 64.234 13.214 105.086-14.909 166.159 8.443 240.668c23.352 74.51 66.843 148.604 139.515 216.06 72.673 67.455 152.487 70.83 217.185 28.381 64.697-42.45 110.55-135.469 136.267-198.44 25.717-62.971 34.06-100.093 27.395-142.137z"
                              fill="url(#violetColor)" fillRule="evenodd" opacity=".896"/>
                    </svg>
                    <svg width="532" height="513" viewBox="0 0 532 513" id={styles['purple']} onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
                        <defs>
                            <linearGradient x1="1.879%" y1="40.27%" x2="105.235%" y2="40.27%" id="purpleColor">
                                <stop stopColor="#B620B4" offset="0%"/>
                                <stop stopColor="#7437BC" offset="100%"/>
                            </linearGradient>
                        </defs>
                        <path id="purple-one"
                              ref={this.purple}
                              d="M530.752 362.109c9.752-68.076-39.012-188.737-98.21-263.415C373.344 24.016 330.504 3.206 270.555.225c-59.95-2.98-107.77 23.79-149.24 71.931-41.47 48.14-61.623 80.755-80.072 120.52C22.793 232.443-3.587 300.937.405 354.26c3.991 53.323 42.612 120.037 125.305 142.859 82.694 22.822 184.502 18.325 264.564 3.6C470.337 485.994 521 430.186 530.752 362.11z"
                              fill="url(#purpleColor)" fillRule="evenodd" opacity=".9"/>
                    </svg>
                    <svg width="577" height="577" viewBox="0 0 577 577" id={styles['green']} onMouseEnter={this.onMouseEnterHandler} onMouseLeave={this.onMouseLeaveHandler}>
                        <defs>
                            <linearGradient x1="6.116%" y1="6.905%" x2="95.02%" y2="91.749%" id="greenColor">
                                <stop stopColor="#00FFCD" offset="0%"/>
                                <stop stopColor="#00D4E4" offset="100%"/>
                            </linearGradient>
                        </defs>
                        <path id="green-one"
                              ref={this.green}
                              d="M541.317 169.948c-33.91-41.177-73.476-70.409-132.648-105.33C363.035 37.685 288.5 11.05 233.439 2.792c-55.06-8.258-90.923 2.32-131.886 24.816C60.59 50.104 25.256 95.316 13.738 142.903S-2.127 236.1.968 291.38c3.62 64.656 24.306 143.548 44.33 185.018 20.022 41.47 54.599 71.94 92.447 87.217 46.042 18.583 97.844 17.098 143.101 0 45.258-17.099 76.856-32.659 127.823-66.586 50.966-33.927 87.887-67.74 116.62-96.828 28.735-29.088 45.82-64.792 50.73-107.9 4.909-43.108-8.895-90.105-34.702-122.352z"
                              fill="url(#greenColor)" fillRule="evenodd" opacity=".9"/>
                    </svg>
                </div>
            </section>
        )
    }
}

export default Section01;