import React from 'react';
import FlipMove from 'react-flip-move';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

// Statless Functional Component
export default () => {
  return(
    <div>
      <PrivateHeader title="Your links"/>
      <div className="page-content">
        <LinksListFilters/>
        <AddLink/>
        <LinksList/>
      </div>
    </div>
  );
}

// export default class Link extends React.Component {
//   render() {
//     return (
//       <div>
//         <PrivateHeader title="Your Links"/>
//         <LinksList/>
//         <AddLink/>
//       </div>
//     );
//   }
// }
