import { z } from "zod";

const useSchema = z.object({
  name: z.string().min(2, "Minimum 2 ta belgi").max(10, "Maxsimum 10 ta belgi"),
  age:z.number().max(30,'30 dan baland bolsin').min(12,'kamida 12 yosh')
});

const useData = {
  name: "X",
  age:15
};


try {
const Parcedata = useSchema.parse(useData);
console.log(Parcedata);

  
} catch (err) {
  console.log(err.errors[0].message);
  
}