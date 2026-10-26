import { Card, CardHeader, CardContent, CardFooter  } from "@/components/ui/card";

interface HyperlinkWidgetProps {
	hyperlinks: {
		id: number;
		url: string;
		title: string;
	}[];
}

export default function HyperlinkWidget({ hyperlinks }: HyperlinkWidgetProps) {
	return (
		<Card>
			<CardHeader>
				Hyperlinks
			</CardHeader>
			<CardContent>
				{hyperlinks.map((hyperlink) => (
					<div key={hyperlink.id}>
						<a href={hyperlink.url}>{hyperlink.title}</a>
					</div>
				))}
			</CardContent>
		</Card>
	);
}