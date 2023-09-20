import moment from "moment";
export const semana = [
  "Domingo",
  "Segunda-Feira",
  "Terça-Feira",
  "Quarta-Feira",
  "Quinta-Feira",
  "Sexta-Feira",
  "Sábado",
];
interface getDay {
  date: string;

  dayIndexNumber: number;
}
export const getDayData = ({ date, dayIndexNumber }: getDay) => {
  const day = moment(date).day();
  return semana[day];
};
