import QkCard from '@/components/QkCard';

const TabCard = () => (
  <div>
    <QkCard title="卡片" extra={<a href="http://github.com/">More</a>}>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </QkCard>
    <QkCard
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
      <QkCard.Meta title="Europe Street beat" description="www.instagram.com" />
    </QkCard>
  </div>
);

export default TabCard;
