import { FaRegEdit } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { FaRegLightbulb } from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import classes from './About.module.css'

const About = () => {
    return (
        <div className={classes['about']}>
            <section className={classes['about__section']}>
                <h2 className={classes['about__title']}><FaRegEdit className={classes['about__icon']} />About This Blog</h2>
                <p className={classes['about__text']}>
                    Welcome to our tech blog – a space dedicated to sharing insights, tutorials, and opinions about the latest in software development.
                </p>
            </section>
            <section className={classes['about__section']}>
                <h3 className={classes['about__subtitle']}><TbTargetArrow className={classes['about__icon']} />Our Mission</h3>
                <p className={classes['about__text']}>
                    This blog is built by developers, for developers. Our mission is to create clear, concise, and practical content around modern web technologies, tools, frameworks, and programming languages.
                </p>
            </section>
            <section className={classes['about__section']}>
                <h3 className={classes['about__subtitle']}><FaRegLightbulb className={classes['about__icon']} />What We Write About</h3>
                <ul className={classes['about__list']}>
                    <li className={classes['about__item']}>JavaScript, TypeScript, and modern ECMAScript features</li>
                    <li className={classes['about__item']}>Frontend frameworks like React, Vue, and Svelte</li>
                    <li className={classes['about__item']}>Backend technologies including Node.js, Express, and databases</li>
                    <li className={classes['about__item']}>DevOps tools, CI/CD, and deployment platforms</li>
                    <li className={classes['about__item']}>Best practices, tips & tricks, and developer workflows</li>
                </ul>
            </section>
            <section className={classes['about__section']}>
                <h3 className={classes['about__subtitle']}><MdGroup className={classes['about__icon']} />About the Authors</h3>
                <p className={classes['about__text']}>
                    This is a community-driven blog where developers share knowledge and experiences. Contributions are welcome!
                </p>
            </section>
        </div>
    )
}
export default About