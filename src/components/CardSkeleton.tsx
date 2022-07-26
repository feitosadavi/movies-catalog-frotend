import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

const Media: React.FC = () => {
	return (
		<Card sx={{ width: 345, marginBottom: '1rem' }}>
			<Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
			<CardContent>
				<React.Fragment>
					<Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
					<Skeleton animation="wave" height={10} width="80%" />
					<Skeleton animation="wave" height={10} width="70%" />
					<Skeleton animation="wave" height={10} width="80%" />
					<Skeleton animation="wave" height={10} width="75%" />
					<Skeleton animation="wave" height={10} width="80%" />
					<Skeleton animation="wave" height={10} width="70%" />
					<Skeleton animation="wave" height={10} width="80%" />
					<Skeleton animation="wave" height={10} width="75%" />
				</React.Fragment>
			</CardContent>
		</Card>
	);
};

export default Media;
