import React, { useEffect, useRef } from 'react';

type Props = {
  mainWrapper: any;
  children: any;
  loader: any;
  dipatchScroll: any;
};

const HorizontalScroll = (props: Props) => {
  let mainWrapperRef = useRef();

  const triggerScroll = (mainWrapperRef) => {
    if (mainWrapperRef.current && Object.keys(mainWrapperRef.current).length > 0) {
      const element = mainWrapperRef.current;
      element.onscroll = (e) => {
        if (e.target.scrollTop + e.target.offsetHeight === e.target.scrollHeight)
          props.dipatchScroll({ scrollHeight: e.target.scrollHeight });
      };
    }
  };

  useEffect(() => {
    triggerScroll(mainWrapperRef);
  }, [triggerScroll]);

  return React.cloneElement(props.mainWrapper, { ref: mainWrapperRef }, [...props.children, props.loader]);
};

export default HorizontalScroll;
