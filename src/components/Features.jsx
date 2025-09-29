import React from 'react';
import chatIcon from '../assets/icon-chat.webp';
import moneyIcon from '../assets/icon-money.webp';
import securityIcon from '../assets/icon-security.webp';
import Feature from './Feature/Feature';

function Features() {
    const featuresData = [
        {
            icon: chatIcon,
            title: "You are our #1 priority",
            description: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
            className: "feature-item"
        },
        {
            icon: moneyIcon,
            title: "More savings means higher rates",
            description: "The more you save with us, the higher your interest rate will be!",
            className: "feature-item"
        },
        {
            icon: securityIcon,
            title: "Security you can trust",
            description: "We use top of the line encryption to make sure your data and money is always safe.",
            className: "feature-item"
        }
    ];

    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {featuresData.map((feature, index) => (
                <Feature
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    className={feature.className}
                />
            ))}
        </section>
    );
}

export default Features;