import { NavLink } from 'react-router-dom';

import { useWidth } from '../../hook';

function SidebarLink(props) {
  const { name, path, onClick, count } = props;

  const isMobile = useWidth();

  return (
    <li className='sidebar__li'>
      <NavLink
        onClick={onClick}
        to={`/books/${path}`}
        data-test-id={`${isMobile ? `navigation-${path}` : `burger-${path}`}`}
        className='sidebar__link-text'
      >
        {name}
      </NavLink>
      <span
        data-test-id={`${isMobile ? `navigation-book-count-for-${path}` : `burger-book-count-for-${path}`}`}
        className='sidebar__link-span'
      >
        {count?.quantity ? count?.quantity : 0}
      </span>
    </li>
  );
}
export { SidebarLink };
