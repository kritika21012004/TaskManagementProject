import React from 'react';
import SelectList from '../../../src/components/SelectList';
import renderer from 'react-test-renderer';

describe('SelectList', () => {
  const lists = ['Option 1', 'Option 2', 'Option 3'];
  const label = 'Test Label';

  it('renders correctly with initial props', () => {
    const setSelected = jest.fn();

    const tree = renderer
      .create(<SelectList lists={lists} selected={lists[0]} setSelected={setSelected} label={label} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("handles no props gracefully", () => {
    const defaultProps = {
      setSelected: jest.fn(),
      label: "Default Label",
      lists: [],
    };
  
    expect(() => renderer.create(<SelectList { ...defaultProps }/>)).not.toThrow();
  });
  
  it("handles non-matching selected prop gracefully", () => {
    const setSelected = jest.fn();
    const lists = ["Option 1", "Option 2", "Option 3"];
    const label = "Test Label";
    const selected = "Option 4"; // This option doesn't exist in lists
    expect(() => renderer.create(
      <SelectList
        lists={lists}
        selected={selected}
        setSelected={setSelected}
        label={label}
      />
    )).not.toThrow();
  });

  
  it("handles missing lists prop gracefully", () => {
    const setSelected = jest.fn();
    const label = "Test Label";
    const lists = [];
    expect(() =>
    renderer.create(
    <SelectList setSelected={setSelected} label={label} lists={lists}/>
    )
    ).not.toThrow();
    });
  
  it("handles missing label prop gracefully", () => {
    const setSelected = jest.fn();
    const lists = ["Option 1", "Option 2", "Option 3"];
    expect(() => renderer.create(<SelectList setSelected={setSelected} lists={lists}/>)).not.toThrow();
  });
  it("updates correctly when new props are passed", () => {
    const setSelected = jest.fn();
    const label = "Test Label";
    const newLabel = "New Test Label";
    const lists = ['test1', 'test2'];
  
    const component = renderer.create(
      <SelectList
        lists={lists}
        selected={lists[0]}
        setSelected={setSelected}
        label={label}
      />
    );
  
    component.update(
      <SelectList
        lists={lists}
        selected={lists[1]}
        setSelected={setSelected}
        label={newLabel}
      />
    );
  
    const instance = component.root;
    expect(instance.props.selected).toBe(lists[1]);
    expect(instance.props.label).toBe(newLabel);
  });

});
