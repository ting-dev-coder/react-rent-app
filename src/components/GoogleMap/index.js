import React from 'react'
import GoogleMapReact from 'google-map-react';
import styles from './index.module.scss'
const AnyReactComponent = ({ text }) => {
  return (
    <>
      <span className={styles.label}>{text}</span>
      <div className={styles.mapArrow}></div>
    </>
  )
}

function GoogleMapCompoment(props) {
  const {
    text = '',
    center = {
      lat: 30.759246040037,
      lng: 106.05655177348
    }
  } = props
  const defaultProps = {
    center: {
      lat: 30.759246040037,
      lng: 106.05655177348
    },
    zoom: 11
  };
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={center.lat}
          lng={center.lng}
          text={text}
        />
      </GoogleMapReact>
    </div >
  );
}

export default GoogleMapCompoment