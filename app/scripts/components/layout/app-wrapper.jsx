var React = require('react');

function AppWrapper(props){
    return(
      <div className="wrapper">
        <header className="hero"></header>
        {props.children}
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