const getCurrentSubcategory = (pathname: string) => pathname.split('/')[2] || '';

export default getCurrentSubcategory;
