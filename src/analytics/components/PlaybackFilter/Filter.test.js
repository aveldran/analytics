import React from 'react';
import { render, cleanup, fireEvent, waitForElement } from 'react-testing-library';
import PlaybackFilter from './PlaybackFilter.js';

afterEach(cleanup)

const Filters = [{
	text: 'show past 7 days ago',
	id: '7-days-ago'
},
{
	text: 'show past 30 days ago',
	id: '30-days-ago'
},
{
	text: 'show past year',
	id: '1-year-ago'
}];

const activeFilters = {
	from: '7-days-ago'
};

const handleClick = jest.fn()

it('renders all filter button', () => {
  const { queryByText } = render(<PlaybackFilter activeFilters={activeFilters.from} filters={Filters}/>);
  const filterBtn1 = queryByText('show past 7 days ago');
  const filterBtn2 = queryByText('show past 30 days ago');
  const filterBtn3 = queryByText('show past year');

  expect(filterBtn1).not.toBeNull();
  expect(filterBtn2).not.toBeNull();
  expect(filterBtn3).not.toBeNull();
});

it('renders with active filter selected', async () => {
	const { queryByText } = render(<PlaybackFilter fetchFn={handleClick} activeFilters={activeFilters} filters={Filters}/>);
	const filterBtn1 = queryByText('show past 7 days ago');
	const filterBtn2 = queryByText('show past 30 days ago');
	const filterBtn3 = queryByText('show past year');

	fireEvent.click(filterBtn2);
	await waitForElement(() => filterBtn2);
	expect(filterBtn2.classList[2]).toBe('active');
});