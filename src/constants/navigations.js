export default {
  routes: [
    {
      to: '/',
      text: 'Home',
      img: {
        src: require('@/static/images/navigations/home.jpg'),
        alt: 'Icon linking to homepage',
      },
    },
    {
      to: '/timeline/',
      text: 'Timeline',
      img: {
        src: require('@/static/images/navigations/timeline.jpg'),
        alt: 'Go to the Timeline section to visualize lived and remaining days',
      },
    },
    // {
    //   to: '/events/',
    //   text: 'Events',
    //   img: {
    //     src: require('@/static/images/navigations/events.jpg'),
    //     alt: 'Go to the Timeline section to visualize lived and remaining days',
    //   },
    // },
  ],
}
