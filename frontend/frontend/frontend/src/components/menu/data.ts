// import toast from 'react-hot-toast';
import {
  HiOutlineCube,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineUsers
} from 'react-icons/hi2';
// import { IoSettingsOutline } from 'react-icons/io5';

export const menu = [
  {
    catalog: 'main',
    listItems: [
      {
        isLink: true,
        url: '/',
        icon: HiOutlineHome,
        label: 'dashboard',
      },
      {
        isLink: true,
        url: '/profile',
        icon: HiOutlineUser,
        label: 'profile',
      },
    ],
  },
  {
    catalog: 'admin',
    listItems: [
      {
        isLink: true,
        url: '/products',
        icon: HiOutlineCube,
        label: 'products',
      },
      {
        isLink: true,
        url: '/brands',
        icon: HiOutlineUsers,
        label: 'brands',
      },
      {
        isLink: true,
        url: '/categories',
        icon: HiOutlineUsers,
        label: 'categories',
      },



      // {
      //   isLink: true,
      //   url: '/orders',
      //   icon: HiOutlineClipboardDocumentList,
      //   label: 'orders',
      // },

    ],
  },
  // {
  //   catalog: 'general',
  //   listItems: [
  //     {
  //       isLink: true,
  //       url: '/notes',
  //       icon: HiOutlinePencilSquare,
  //       label: 'notes',
  //     },
  //     {
  //       isLink: true,
  //       url: '/calendar',
  //       icon: HiOutlineCalendarDays,
  //       label: 'calendar',
  //     },
  //   ],
  // },
  // {
  //   catalog: 'analytics',
  //   listItems: [
  //     {
  //       isLink: true,
  //       url: '/charts',
  //       icon: HiOutlinePresentationChartBar,
  //       label: 'charts',
  //     },
  //     {
  //       isLink: true,
  //       url: '/logs',
  //       icon: HiOutlineDocumentText,
  //       label: 'logs',
  //     },
  //   ],
  // },

];
