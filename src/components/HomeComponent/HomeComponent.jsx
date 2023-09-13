import React from 'react'
import styles from './homecomponent.module.css'

function HomeComponent() {
    return (
        <div>
            <section className={styles.home} id={styles.home}>
                <div className={styles.content}>
                    <h5 className={styles.contentH5}>Super phones
                        <span className={styles.contentSpan}> Super prices</span>
                    </h5>
                    <p className={styles.contentP}>MobileShop is the largest European webshop for smartphones and consumer electronics</p>
                    <a href='#phones' className={styles.btnShop}>Shop now</a>
                </div>
            </section>
        </div>
    )
}

export default HomeComponent