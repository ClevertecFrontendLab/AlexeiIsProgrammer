const getCurrentRecipe = (pathname: string) => pathname.split('/')[3] || '';

export default getCurrentRecipe;
