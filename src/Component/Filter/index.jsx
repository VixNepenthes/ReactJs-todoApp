import { HStack, Radio, RadioGroup, Text } from '@chakra-ui/react';
import React from 'react';
import { FILTER_STATUS } from '../../ultis/constant';
import { useDispatch, useSelector } from 'react-redux';
import { filterTasks } from '../../redux/actions/taskAction';

const Filter = () => {
	const dispatch = useDispatch();
	const filterStatus = useSelector((state) => state.task.filter);
	function handleFilterChange(filterStatus) {
		dispatch(filterTasks(filterStatus));
	}
	return (
		<HStack
			className='filter__container'
			justify='center'
			align='center'
			gap={6}
		>
			<Text>Filter: </Text>
			<RadioGroup
				colorScheme='teal'
				display='flex'
				alignItems='center'
				gap={6}
				className='filter__radio-group'
				value={filterStatus}
				onChange={handleFilterChange}
			>
				<Radio
					className='radio-group__radio-item'
					value={FILTER_STATUS.ALL}
				>
					All
				</Radio>
				<Radio
					className='radio-group__radio-item'
					value={FILTER_STATUS.DONE}
				>
					Done
				</Radio>
				<Radio
					className='radio-group__radio-item'
					value={FILTER_STATUS.UNDONE}
				>
					Undone
				</Radio>
			</RadioGroup>
		</HStack>
	);
};

export default Filter;
