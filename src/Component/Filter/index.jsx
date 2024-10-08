import { HStack, Radio, RadioGroup, Text } from '@chakra-ui/react';
import React from 'react';
import { FILTER_STATUS } from '../../ultis/constant';

const Filter = () => {
	return (
		<HStack
			className='filter__container'
			justify='center'
			align='center'
			gap={6}
			w='100%'
		>
			<Text>Filter: </Text>
			<RadioGroup
				colorScheme='teal'
				display='flex'
				alignItems='center'
				gap={6}
				className='filter__radio-group'
				defaultValue={FILTER_STATUS.ALL}
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
