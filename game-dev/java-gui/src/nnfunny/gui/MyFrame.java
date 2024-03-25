package nnfunny.gui;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class MyFrame extends JFrame implements ActionListener {
  JButton button = new JButton("Submit");
  JTextField textField = new JTextField();

  MyFrame() {
    this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    this.setLayout(new FlowLayout());

    JCheckBox checkBox = new JCheckBox();
    checkBox.setText("Liked");
    checkBox.setFocusable(false);
    checkBox.setFont(new Font("Consolas", Font.PLAIN, 25));

    this.add(checkBox);
    this.setTitle("GUI JAVA");
    this.pack();
    this.setVisible(true);
  }

  @Override
  public void actionPerformed(ActionEvent e) {

  }
}
