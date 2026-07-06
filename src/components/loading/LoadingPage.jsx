import styles from "./style.module.css"

export default function LoadingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.jelly} />
            <svg width={0} height={0} className={styles.jelly_maker}>
                <defs>
                    <filter id="uib-jelly-ooze">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="6.25" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="ooze" />
                        <feBlend in="SourceGraphic" in2="ooze" />
                    </filter>
                </defs>
            </svg>
        </div>
    )
}
