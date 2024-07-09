const { formatDate, dateFormatter, getInitials, PRIOTITYSTYELS, TASK_TYPE, BGS } = require('../index.js'); 

describe('Utils', ()=> {

  it('should format the date correctly', () => {
    const myDate = new Date('2020-01-01');
    const expected = '1-Jan-2020';
    expect(formatDate(myDate)).toEqual(expected);
  });
    
  it('should return date in YYYY-MM-DD format', ()=> {
      const myDate = '2020-01-01';
      const expected = '2020-01-01';
      expect(dateFormatter(myDate)).toEqual(expected);
  });

  it('should return an empty string when name is not provided', ()=> {
      const expected = '';
      expect(getInitials(undefined)).toEqual(expected);
  });

  it('should handle null', ()=> {
      const expected = '';
      expect(getInitials(null)).toEqual(expected);
  });

  it('should correctly get the initials', ()=> {
      const expected = 'BC';
      expect(getInitials('Bill Clinton')).toEqual(expected);
  });

  it('should return correct class for high priority', ()=> {
      const expected = 'text-red-600';
      expect(PRIOTITYSTYELS.high).toEqual(expected);
  });
});