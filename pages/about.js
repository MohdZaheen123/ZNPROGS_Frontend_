import styles from '@/styles/About.module.css'

const about = () => {
  return (
    <div className={styles.head}>
      <div id='txt' className={styles.about}>
        <p className={styles.headding}>Welcome to ZnProgs</p>

        <p className={styles.content}><b>About Me</b><br /><br /> I am a passionate coding enthusiast and a student at National Institute of Technology Calicut. As a member of the GDSC (Google Developer Student Clubs) club, specifically the Web Development section, I have embarked on a coding journey filled with excitement, challenges, and continuous learning.</p>

      </div>
      <div className={styles.about} id={styles.second}>


        <p className={styles.mission}> <b>Mission</b><br /><br /> At ZnProgs, my mission is to share my knowledge, experiences, and insights about coding with fellow enthusiasts like you. I believe that coding is not just a skill but a powerful tool that empowers individuals to solve problems, unleash creativity. Through my blog, I aim to inspire, educate, and support you in your coding journey. <br /><br />Join Me on the Coding Journey <br /> <br />

          Whether you're a beginner or an experienced programmer looking to expand your knowledge, ZnProgs is here to guide and support you. Together, let's explore the exciting world of coding, unlock new possibilities, and make a positive impact through our creations.</p>
      </div>
    </div>
  )
}

export default about
