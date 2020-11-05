import React from 'react';
import * as classes from "../Article/Article.module.scss";
import {HeartTwoTone} from "@ant-design/icons";
import {Tag} from "antd";

const Article = () => {
  return (
    <div className={classes.container}>
      <div className={classes.textInfo}>
        <div className={classes.title}>
          <h5 className={classes.title__text}>Some article title</h5>
          <HeartTwoTone twoToneColor="#eb2f96" style={{fontSize: 18}}/>
          <span className={classes.title__likes}>12</span>
        </div>
        <div className={classes.tags}>
          <Tag>tag 1</Tag>
          <Tag>tag 2</Tag>
        </div>
        <div className={classes.summary}>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias aperiam aspernatur consequuntur culpa
            deserunt dolore dolorem doloribus eius error esse est, ex exercitationem harum inventore ipsa labore laborum
            laudantium libero maxime minima non officia optio placeat possimus praesentium provident quaerat qui sed sit
            temporibus ut vitae voluptatibus! Aliquid, dolores!</p>
        </div>
        <p>
          Est Ampyciden pater patent
          Amor saxa inpiger
          Lorem markdownum Stygias neque is referam fudi, breve per. Et Achaica tamen: nescia ista occupat, illum se ad potest humum et.

          Qua deos has fontibus
          Recens nec ferro responsaque dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo omnes ne pendentia citus pedum.

          Quamvis pronuba
          Ulli labore facta. Io cervis non nosterque nullae, vides: aethere Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus draconem, hic, Methymnaeae.

          1. Clamoribus haesit tenentem iube Haec munera
          2. Vincla venae
          3. Paris includere etiam tamen
          4. Superi te putria imagine Deianira
          5. Tremore hoste Esse sed perstat capillis siqua
        </p>
      </div>
      <div className={classes.userInfo}>
        <div>
          <h6 className={classes.userInfo__name}>John Doe</h6>
          <span className={classes.userInfo__date}>March 5, 2020</span>
        </div>
        <div className={classes.userInfo__avatar}/>
      </div>
    </div>
  );
}

export default Article;
