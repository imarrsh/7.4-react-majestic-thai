var React = require('react');

function AppWrapper(props){
    return(
      <div className="wrapper">
        <header className="hero"></header>
        {props.children}
        <footer>
          <div className="container">
            <div className="row">
              <h4>
                See what&rsquo;s going on in the <a href="#kitchen/">kitchen</a>!
              </h4>
            </div>
          </div>
        </footer>
      </div>
    );
}

function Row(props){
  return(
    <div className="row">
      {props.children}    
    </div>
  );
}

module.exports = {
  AppWrapper: AppWrapper,
  Row: Row
}