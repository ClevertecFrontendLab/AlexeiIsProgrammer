const transformAllergen = (allergen: string) => allergen.split(/[()]/)[0].trim();

export default transformAllergen;
