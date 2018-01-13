import React, { PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import WorkCard from './WorkCard';
 
const paddingStyle = {
  margin: '10px',
  boxShadow: '0px 3px 6px #888888'
};

class Gallery extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleImagesLoaded = this.handleImagesLoaded.bind(this);    
    }

    componentDidMount() {
        this.masonry.on('layoutComplete', this.handleLayoutComplete);
    }

    componentWillUnmount() {
        this.masonry.off('layoutComplete', this.handleLayoutComplete);
    }

    handleImagesLoaded () {
        //console.log('immmmmmmmmmmmmg');
    }

    handleLayoutComplete() { 
        //console.log('ccccccccccooooooomplte');
    }

    render() {
    let childElements = this.props.elements.map((element, index) => {
        return (
            <div style={paddingStyle} key={index}>
                <WorkCard 
                    imgUrl={element.imgUrl} 
                    workId={element.workId}
                    title={element.title}
                    desc={element.desc}
                    workDesc={element.workDesc}
                    downloadInstruction={element.downloadInstruction}
                    isAdmin={this.props.isAdmin}
                    />
            </div>                
            );
    });

        return (
            <Masonry
                ref={function(c) {this.masonry = this.masonry || c.masonry;}.bind(this)}
                disableImagesLoaded={false} // default false 
                updateOnEachImageLoad={true} // default false and works only if disableImagesLoaded is false 
                onImagesLoaded={this.handleImagesLoaded}
            >
            {childElements}
            </Masonry>
        );
    }
 }

Gallery.propTypes = {
    elements: PropTypes.arrayOf(PropTypes.shape({
     title: PropTypes.string.isRequired,
     imgUrl: PropTypes.string.isRequired,
     desc: PropTypes.string.isRequired,
     workId: PropTypes.number.isRequired
    })).isRequired,
    isAdmin: PropTypes.bool.isRequired
};

 module.exports = Gallery;