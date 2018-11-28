import React from 'react';
import Section01 from "./section01/Section01";
import Section02 from "./section02/Section02";

class IndexLayout extends React.Component{
    render(){
        return(
          <main className={""}>
              <Section01/>
              <Section02/>
          </main>
        )
    }
}
export default IndexLayout;