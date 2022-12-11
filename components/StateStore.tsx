import { Dispatch, SetStateAction, useState } from "react";
import { StudentType } from "../types";

export default function StateStore() {
  const [ Items, setItem ] = useState<StudentType[][]>([])
  const [ NoneItems, setNoneItem ] = useState<StudentType[][]>([])
  const [ AgeItems, setAgeItem ] = useState<StudentType[][]>([])
  const [ ClassItems, setClassItem ] = useState<StudentType[][]>([])
  const [ GenderItems, setGenderItem ] = useState<StudentType[][]>([])

  const arrangeStudentByName = (state: Dispatch<SetStateAction<StudentType[][]>>) => {
    state(prev => {
      return prev.map((a: StudentType[]) => {
        return a.sort((c: {name: string}, d: {name: string}) => c.name.localeCompare(d.name))
      })
    })
  }
  
  return {
    Items,
    NoneItems,
    AgeItems,
    ClassItems,
    GenderItems,
    setItem,
    setNoneItem,
    setAgeItem,
    setClassItem,
    setGenderItem,
    arrangeStudentByName,
  }

}