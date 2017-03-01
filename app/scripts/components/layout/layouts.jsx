var React = require('react');
var Link = require('react-router').Link;

function AppWrapper(props){
    return(
      <div className="wrapper">
        <header className="hero"></header>
        {props.children}
        <footer>
          <div className="container">
            <div className="row">
              <h4>
                See what&rsquo;s going on in the <Link to="kitchen">kitchen</Link>!
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