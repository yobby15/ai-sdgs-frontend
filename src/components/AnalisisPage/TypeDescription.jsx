import { CARDS, typeColor, typeBg } from '../../data/constants';

const TypeDescription = ({ type }) => {
  return (
    <div 
      className="rounded-xl border py-4 px-5 transition-colors duration-300"
      style={{ backgroundColor: typeBg[type], borderColor: `${typeColor[type]}33` }}
    >
      <p className="m-0 text-[13px] text-slate-600 leading-relaxed">
        <strong style={{ color: typeColor[type] }}>{type}:</strong> {CARDS.find(c => c.tag === type)?.desc}
      </p>
    </div>
  );
};

export default TypeDescription;