export default  {
  scroll(scrollDuration) {
    let scrollStep = -window.scrollY / (scrollDuration / 15);
    let scrollInterval = setInterval(() => {
      if (window.scrollY != 0) {
        window.scrollBy(0, scrollStep);
      } else clearInterval(scrollInterval); 
    }, 15);
  }
};
