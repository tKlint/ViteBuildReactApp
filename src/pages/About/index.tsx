import QkTabs from '@/components/QkTabs';
import React from 'react';
import TabCard from './components/TabCard';
import TabEmpty from './components/TabEmpty';
import TabModal from './components/TabModal';
import TabTable from './components/TabTable';

import './style.less';

type IProps = {};
const About: React.FC<IProps> = () => {
  const tabItems = [
    { label: 'table', key: 'item-table', children: <TabTable /> },
    { label: 'modal', key: 'item-modal', children: <TabModal /> },
    { label: 'card', key: 'item-card', children: <TabCard /> },
    { label: 'empty', key: 'item-empty', children: <TabEmpty /> },
  ];
  return (
    <div className="page-About">
      <QkTabs items={tabItems} />
    </div>
  );
};

export default About;
