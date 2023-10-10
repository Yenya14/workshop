import diaryData from "../../data/patients";
import { Patient, PatientWithoutId } from "../types";
import { v1 as uuid } from "uuid";

const getEntries = () => {
  return diaryData;
};

const addDiary = (entry: PatientWithoutId) => {
  const newDiaryEntry: Patient = {
    ...entry,
    id: uuid(),
  };

  diaryData.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addDiary
};